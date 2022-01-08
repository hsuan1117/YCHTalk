<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatUser;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use JCrowe\BadWordFilter\Facades\BadWordFilter;

class ChatController extends Controller
{
    public function join(Request $request){
        if( Cookie::has('guid') ){
            $uid = Cookie::get('guid');
        } else {
            $uid = Str::random(30); #Crypt::encryptString();
        }

        $user = User::where('uid', $uid)->firstOrCreate(
            ['uid' => $uid]
        );

        /*Chat::whereHas('users', function($q) use ($uid) {
            $q->where('uid', $uid);
        })->with(['users'])->first()->users->count();*/

        $own_chat = DB::select("SELECT * FROM chat_user WHERE user_id = ? GROUP BY chat_id HAVING COUNT(chat_id) = 1 ", [$user->id]);
        $own_chat = collect($own_chat)->filter(function ($value, $key) use ($user, $uid) {
            return is_null($value->deleted_at);
        });
        if($own_chat->count() != 0){
            $chat = Chat::with('users')->find($own_chat->first()->chat_id);

            Log::info("{$user->id} found joined room {$own_chat->first()->chat_id}");
            return response($chat)->cookie('guid', $uid, 360000);
        }

        $chats = DB::select("SELECT * FROM chat_user GROUP BY chat_id HAVING COUNT(chat_id) = 1 ");
        $chats = collect($chats)->filter(function ($value, $key) use ($user, $uid) {
            return is_null($value->deleted_at);
        });
        if(count($chats) == 0){
            $chat = Chat::create();
            $chat->users()->attach($user->id);

            $chat = Chat::with('users')->find($chat->id);

            Log::info("{$user->id} create room {$chat->id}");
            return response($chat)->cookie('guid', $uid, 360000);
        }

        $chats2 = collect($chats)->filter(function ($value, $key) use ($user, $uid) {
            return $value->user_id != $user->id;
        });
        if ($chats2->count() > 0){
            $chat = Chat::with('users')->find($chats2->first()->chat_id);
            $chat->users()->attach($user->id);

            $chat = Chat::with('users')->find($chat->id);

            Log::info("{$user->id} found room {$chat->id}");
            return response($chat)->cookie('guid', $uid, 360000);
        } else {
            // 只有自己的房間
            Log::info("{$user->id} only found itself {$chats[0]->chat_id}");
            return response(Chat::with('users')->find($chats[0]->chat_id))->cookie('guid', $uid, 360000);
        }

    }

    public function leave(Request $request){
        if( Cookie::has('guid') ){
            $uid = Cookie::get('guid');
        } else {
            $uid = Str::random(30); #Crypt::encryptString();
        }

        $user = User::where('uid', $uid)->firstOrCreate(
            ['uid' => $uid]
        );

        $cu = ChatUser::where('user_id', $user->id)->get();
        $cu->each(function($c){
            ChatUser::where('chat_id',$c->chat_id)->delete();
        });

        return response([
            'status' => 'success',
            'message' => 'left'
        ]);
    }

    public function send(Request $request){
        if( Cookie::has('guid') ){
            $uid = Cookie::get('guid');
        } else {
            $uid = Str::random(30); #Crypt::encryptString();
        }

        $user = User::where('uid', $uid)->firstOrCreate(
            ['uid' => $uid]
        );

        $msg  = $request->input('msg');
        $type = $request->input('type', 'text');

        $own_chat = DB::select("SELECT * FROM chat_user WHERE user_id = ? GROUP BY chat_id HAVING COUNT(chat_id) = 1 ", [$user->id]);
        $own_chat = collect($own_chat)->filter(function ($value, $key) use ($user, $uid) {
            return is_null($value->deleted_at);
        });
        if($own_chat->count() != 0){
            $message = Message::create([
                'chat_id' => $own_chat->first()->chat_id,
                'sender'  => $user->id,
                'content' => [
                    'type' => $type,
                    'content' => BadWordFilter::clean($msg)
                ]
            ]);
            return response([
                'status' => 'success',
                'message' => 'sent'
            ]);
        } else {
            return \response([
                'status' => 'error',
                'message' => 'not in chat'
            ], 403);
        }
    }

    public function get(Request $request){
        if( Cookie::has('guid') ){
            $uid = Cookie::get('guid');
        } else {
            $uid = Str::random(30); #Crypt::encryptString();
        }

        $user = User::where('uid', $uid)->firstOrCreate(
            ['uid' => $uid]
        );

        $last = $request->input('lastId', -1);
        # Log::debug($request->all());
        $own_chat = DB::select("SELECT * FROM chat_user WHERE user_id = ? GROUP BY chat_id HAVING COUNT(chat_id) = 1 ", [$user->id]);
        $own_chat = collect($own_chat)->filter(function ($value, $key) use ($user, $uid) {
            return is_null($value->deleted_at);
        });
        if($own_chat->count() != 0){
            $msg = Message::where('chat_id', $own_chat->first()->chat_id)->where('id', '>', $last)->get();
            $msg = $msg->map(function($m) use ($user) {
               if($m->sender == $user->id) {
                   $m->position = 'right';
               } else {
                   $m->position = 'left';
               }
                return $m;
            });
            return response([
                'lastId' => (is_null($msg->last()) ? $last : $msg->last()->id),
                'all' => $msg
            ]);
        } else {
            return \response([
                'status' => 'error',
                'message' => 'not in chat'
            ]);
        }
    }
}

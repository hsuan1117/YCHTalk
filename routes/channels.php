<?php

use App\Models\Chat;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat.{cid}', function ($cid) {
    # chatroom id
    return is_null(
        Chat::find($cid)
            ->users()
            ->find(Cookie::get('guid'))
    );
});

Broadcast::channel('chat', function($id){
    return $id;
});

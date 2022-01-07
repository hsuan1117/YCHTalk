<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getSession(){
        if( \Cookie::has('guid') ){
            return \Cookie::get('guid');
        } else {
            $uid = Str::random(30); #Crypt::encryptString();
            return \response($uid)->cookie('guid', $uid, 360000);
        }
    }
}

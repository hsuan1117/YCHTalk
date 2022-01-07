<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\EloquentUserProvider as UserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Illuminate\Support\Str;


class SSOUserProvider extends UserProvider {

    public function updateOrCreateSSOUser($credential)
    {
        $user = User::whereEmail($credential->email)->first();
        if(!$user){
            $user = User::create([
                'email' => $credential->email,
                'password' => bcrypt(Str::random(16)),
                'name' => $credential->given_name . ' ' . $credential->family_name
            ]);
        }
        return $user;
    }

}

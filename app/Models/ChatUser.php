<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;


class ChatUser extends Pivot
{
    use HasFactory, SoftDeletes;
    protected $table = 'chat_user';

}

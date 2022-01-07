<?php

namespace App\Listeners;

use App\Events\BeyondCodeLaravelWebSocketsEventsNewConnection;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Log\Logger;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class WSConnectedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\BeyondCodeLaravelWebSocketsEventsNewConnection  $event
     * @return void
     */
    public function handle(BeyondCodeLaravelWebSocketsEventsNewConnection $event)
    {
        Log::info('connected');
    }
}

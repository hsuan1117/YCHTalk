<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        return Notice::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(Auth::user()->can('edit notice')){
            return Notice::create($request->all());
        }else {
            return response('',403);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notice  $notice
     */
    public function show(Notice $notice)
    {
        return $notice;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notice $notice)
    {
        if(Auth::user()->can('edit notice')){
            Notice::update($request->all());
            return response([
                'status' => 'success'
            ]);
        }else {
            return response('',403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notice $notice)
    {
        if(Auth::user()->can('edit notice')){
            Notice::delete();
            return response([
                'status' => 'success'
            ]);
        }else {
            return response('',403);
        }
    }
}

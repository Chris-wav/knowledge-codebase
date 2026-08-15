<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBugRequest;
use App\Http\Requests\UpdateBugRequest;
use App\Http\Resources\BugResource;
use App\Models\Bug;

class BugController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bugs = Bug::all();

        return BugResource::collection($bugs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBugRequest $request)
    {
        $bug = Bug::create($request->validated());

        return new BugResource($bug)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bug = Bug::findOrFail($id);

        return new BugResource($bug);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBugRequest $request, Bug $bug)
    {
        $bug->update($request->validated());

        return new BugResource($bug);
    }
}

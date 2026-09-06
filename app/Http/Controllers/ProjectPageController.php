<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectPageController extends Controller
{
    public function show(Request $request): Response
    {
        $project = $request->user()
            ->projects()
            ->where('slug', $request->route('project'))
            ->withCount('bugs')
            ->with('bugs')
            ->firstOrFail();

        return Inertia::render('ProjectPage', [
            'project' => new ProjectResource($project),
        ]);
    }
}

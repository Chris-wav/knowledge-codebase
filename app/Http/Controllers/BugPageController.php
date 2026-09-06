<?php

namespace App\Http\Controllers;

use App\Http\Resources\BugResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BugPageController extends Controller
{
    public function show(Request $request): Response
    {
        $project = $request->user()->projects()->where('slug', $request->route('project'))->firstOrFail();
        $bug = $project->bugs()->where('id', $request->route('bug'))->firstOrFail();

        return Inertia::render('BugPage', [
            'bug' => new BugResource($bug),
            'project_slug' => $project->slug,
        ]);
    }
}

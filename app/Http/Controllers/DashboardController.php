<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = $request->user()->projects()->withCount('bugs')->orderBy('name')->paginate(15);

        return Inertia::render('Dashboard',
        [
            'projects' => ProjectResource::collection($projects),
        ]);
    }
}

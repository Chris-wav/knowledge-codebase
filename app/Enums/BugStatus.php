<?php

namespace App\Enums;

enum BugStatus: string
{
    //
    case Open = 'open';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';
}

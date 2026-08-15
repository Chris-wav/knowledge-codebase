<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBugRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'error_message' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'cause' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'status' => ['required', 'string', 'max:255'],
            'project_name' => ['nullable', 'string', 'max:255'],
            'technology' => ['nullable', 'string', 'max:255'],
        ];
    }
}

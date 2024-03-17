<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Subcategory;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $avatarPath = $request->file('avatar')->store('public/images');
        $avatarPath = str_replace('public/images/', '', $avatarPath);

        $user = Auth::user();
        $user->image = $avatarPath;
        $user->save();

        // return response()->json(['avatar_path' => $avatarPath], 200);
    }

    public function roles(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
            'role' => 'required',
        ]);

        $user = User::findOrFail($request->id);
        if ($user) {
            $user->role = $request->role ? $request->role : $user->role;
            $user->category = $request->categories[0] ? $request->categories[0] : $user->categories;
            $user->save();

            if ($request->subcategories) {
                foreach ($request->subcategories as $subcategory) {
                    Subcategory::updateOrCreate(
                        ['user_id' => $request->id, 'subcategories' => $subcategory]
                    );
                }
            }
        }

        return response()->json(['message' => 'Categories stored successfully'], 200);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

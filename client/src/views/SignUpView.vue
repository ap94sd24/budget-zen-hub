<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Sign Up</h1>

        <p class="mb-6 text-gray-500">
          dsfad asdfa fasd fadfdsf dasf asdfds dff f adsfd saf adsfd dsfad asdfa fasd fadfdsf dasf
          asdfds dff f adsfd saf adsfd
        </p>

        <p class="font-bold">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="underline">Click here</RouterLink> to login to
          your account!
        </p>
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form action="" class="space-y-6">
          <div>
            <label for="email">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your full name"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="email"> E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="email"> Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="email"> Repeat Password</label>
            <input
              type="password"
              name="password-repeat"
              id="password-repeat"
              placeholder="Repeat your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <button class="py-4 px-6 bg-blue-600 text-white rounded-lg">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

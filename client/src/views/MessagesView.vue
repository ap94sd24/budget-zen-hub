<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img
                src="https://i.pravatar.cc/300?img=70"
                alt="Gravatar img"
                class="w-[40px] rounded-full"
              />

              <p class="text-xs"><strong>Test description</strong></p>
            </div>

            <span class="text-xs text-gray-500">19 minutes ago</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img
                src="https://i.pravatar.cc/300?img=68"
                alt="Gravatar img"
                class="w-[40px] rounded-full"
              />

              <p class="text-xs"><strong>Test description</strong></p>
            </div>

            <span class="text-xs text-gray-500">19 minutes ago</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img
                src="https://i.pravatar.cc/300?img=69"
                alt="Gravatar img"
                class="w-[40px] rounded-full"
              />

              <p class="text-xs"><strong>Test description</strong></p>
            </div>

            <span class="text-xs text-gray-500">19 minutes ago</span>
          </div>
        </div>
      </div>
    </div>

    <div class="main-center col-span-3 space-y-4">
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="flex flex-col flex-grow p-4">
          <div class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end">
            <div>
              <div class="bg-green-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">afdf afdf asfd a df afdafa sdf</p>
              </div>
              <span class="text-xs text-gray-500 leading-none"> 2 min ago </span>
            </div>
            <div class="flex-shrink-0 h-11 w-11 rounded-full bg-gray-300">
              <img
                src="https://i.pravatar.cc/300?img=50"
                alt="Pravatar image"
                class="w-[45px] rounded-full"
              />
            </div>
          </div>
          <div class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end">
            <div>
              <div class="bg-green-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">
                  afdf afdf asfd a df afdafa sd adsff adfa asdfasd adsf asdfasd fadsfads aadsf d
                </p>
              </div>
              <span class="text-xs text-gray-500 leading-none"> 2 min ago </span>
            </div>
            <div class="flex-shrink-0 h-11 w-11 rounded-full bg-gray-300">
              <img
                src="https://i.pravatar.cc/300?img=50"
                alt="Pravatar image"
                class="w-[45px] rounded-full"
              />
            </div>
          </div>
          <div class="flex w-full mt-2 space-x-3 max-w-md mr-auto">
            <div class="flex-shrink-0 h-11 w-11 rounded-full bg-gray-300">
              <img
                src="https://i.pravatar.cc/300?img=40"
                alt="Pravatar image"
                class="w-[45px] rounded-full"
              />
            </div>
            <div>
              <div class="bg-gray-200 p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">
                  afdf afdf asfd a df afdafa sd adsff adfa asdfasd adsf asdfasd fadsfads aadsf d
                </p>
              </div>
              <span class="text-xs text-gray-500 leading-none"> 2 min ago </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="p-4">
          <textarea
            name="budget-qs"
            id="budget-qs"
            class="p-4 w-full bg-gray-100 rounded-lg"
            placeholder="What do you want to talk about?"
          ></textarea>
        </div>
        <div class="p-4 border-t border-gray-100 flex justify-between">
          <a href="#" class="inline-block py-4 px-6 bg-blue-600 text-white rounded-lg">Post</a>
        </div>
      </div>
    </div>
  </div>
</template>

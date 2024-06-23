<template>
  <div class="snap-center p-5 gap-5 flex flex-row justify-center items-center">
    <p class="title-2 basis-2/5">
      Engineered to be easy.
    </p>

    <div
      class="w-full h-96 rounded-xl shadow-2xl flex flex-row items-stretch glass-thick-base"
    >
      <div class="px-2 py-5 glass-semithick rounded-l-xl space-y-5 drop-shadow">
        <!-- Circle Discord Logo-->
        <div class="glass-thick h-5 w-5 rounded-full"></div>

        <!-- Circle server logos -->
        <div class="space-y-2">
          <div class="glass-thick h-5 w-5 rounded-full"></div>
          <div class="glass-thick h-5 w-5 rounded-full"></div>
          <div class="glass-thick h-5 w-5 rounded-full"></div>
          <div class="glass-thick h-5 w-5 rounded-full"></div>
        </div>
      </div>
      <!-- Holds the server name and channels section-->
      <div class="shadow-xl p-2 glass-thin space-y-2">
        <!-- Holds the channel name -->
        <div class="px-2">
          <span class="text-white font-semibold text-xs whitespace-nowrap">
            Chai Preview
          </span>
        </div>

        <div class="glass-thin-base rounded text-right p-2 shadow"></div>
        <div class="glass-normal rounded text-right p-2 shadow"></div>
        <div class="glass-normal rounded text-right p-2 shadow"></div>
        <div class="glass-normal rounded text-right p-2 shadow"></div>
        <div class="glass-normal rounded text-right p-2 shadow"></div>
      </div>
      <!-- Holds the actual messages and channel name at the top-->
      <div class="w-full flex flex-col">
        <!-- Mimics as if the channel name was there-->
        <div class="p-3 glass-thick shadow rounded-tr-xl"></div>

        <div class="h-full rounded-br-xl relative">
          <!-- Message box -->
          <div class="h-full w-full pb-12 pt-5 px-5 glass-normal flex">
            <div class="self-end flex flex-row gap-2">
              <!-- PFP -->
              <div class="w-6 h-6 flex-none rounded-full bg-indigo-400"></div>

              <!-- Actual embed -->
              <div class="shadow rounded-xl flex flex-row w-fit h-fit">
                <div class="basis-[1%] bg-indigo-400 rounded-l-xl w-fill"></div>

                <div class="basis-[99%] glass-thick rounded-r-xl px-2 py-1">
                  <!-- Inner workings of embed-->

                  <div>
                    <span class="text-white text-xs font-bold">
                      Chai's Fortnite Locker
                    </span>
                  </div>

                  <div class="text-white text-xss">
                    <span>
                      <span class="font-semibold">Total Cosmetics</span>: 1,994,
                      <span class="font-semibold">Filtered Cosmetics</span>:
                      1,777.
                    </span>
                  </div>

                  <!-- The actual image of the embed -->
                  <div class="flex justify-center pt-2">
                    <img src="@/assets/locker.png" class="w-fit h-auto" />
                  </div>

                  <div class="pt-1 text-gray-300 text-xss">
                    <span>
                      <span class="font-semibold">51.77</span> seconds total,
                      <span class="font-semibold">31.99</span> seconds for the
                      image.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Holds the fake "send message" button-->
          <div class="flex absolute bottom-0 w-full px-5 py-3 space-x-5">
            <!-- "Attachment" button - circle with a plus in it -->
            <div class="flex-none h-5 w-5 glass-thin-base rounded-full"></div>
            <div class="h-5 w-full glass-thin-base rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

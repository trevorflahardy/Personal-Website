<script setup>
import DiscordIcon from "@/assets/DiscordIcon.vue";

const chaiUrl =
  "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
</script>

<template>
  <div class="p-5 space-y-5">
    <!--Description of Chai -->
    <div
      class="glass-thick flex flex-col items-center justify-center p-5 rounded-xl snap-center space-y-2"
    >
      <div>
        <span class="text-white font-semibold text-4xl"> Chai </span>
      </div>
      <div class="text-center">
        <span class="text-gray-300 text-md max-w-[70%]">
          A description of what Chai is. This is a very long description that
          should take up multiple lines. It should be very long and very
          descriptive.
        </span>
      </div>
      <!-- Holds some buttons for actions -->
      <!-- <div class="flex flex-row items-center justify-center mt-3">
      </div> -->
    </div>

    <!-- Holds cards about the box -->
    <div class="flex flex-row items-stretch justify-center gap-5 snap-center">
      <article
        class="basis-1/3 shadow-xl rounded-xl px-5 py-12 bg-gradient-to-br from-yellow-500 from-40 to-red-600 h-full"
      >
        <!-- TODO: Maybe refac this verbiage -->
        <span class="text-white text-4xl font-semibold text-balance">
          Built in Python, expanded in Rust.
        </span>
      </article>

      <!-- TODO: Holds some cards that contain some jargon about what Chai is-->
      <article
        class="basis-2/3 bg-gradient-to-br from-blue-500 to-indigo-800 shadow rounded-xl overflow-hidden p-5 space-y-5 flex flex-col items-center justify-center"
      >
        <div class="space-y-1">
          <div>
            <span class="text-white text-2xl font-semibold">
              Try on Discord
            </span>
          </div>

          <div>
            <span class="text-gray-300 text-md">
              Some sort of descripiton about trying the bot on Discord. This can
              be super duper long and take up multiple lines so that the card
              looks super duper good.
            </span>
          </div>
        </div>

        <div class="self-end">
          <a :href="chaiUrl">
            <button class="button-glass">
              <DiscordIcon class="w-5 h-5 fill-white" />
              <span class="text-white font-semibold"> Try on Discord </span>
            </button>
          </a>
        </div>
      </article>
    </div>

    <!-- Holds a preview of what Chai does (maybe macbook preview of it being used on Discord with some text next to it??)-->
    <div
      class="snap-center p-5 gap-5 flex flex-row justify-center items-center"
    >
      <div class="basis-2/5 text-center">
        <span class="text-white text-4xl font-semibold text-pretty">
          Engineered to be easy.
        </span>
      </div>

      <div
        class="w-full h-96 rounded-xl shadow-2xl flex flex-row items-stretch"
      >
        <div class="px-2 py-5 glass-thick rounded-l-xl space-y-5 drop-shadow">
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
        <div class="shadow-xl p-2 glass-semi-thick space-y-2">
          <!-- Holds the channel name -->
          <div class="px-2">
            <span class="text-white font-semibold text-xs whitespace-nowrap">
              Chai Preview
            </span>
          </div>

          <div class="glass-thin-front rounded text-right p-2 shadow"></div>
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
                  <div
                    class="basis-[1%] bg-indigo-400 rounded-l-xl w-fill"
                  ></div>

                  <div class="basis-[99%] glass-thick rounded-r-xl px-2 py-1">
                    <!-- Inner workings of embed-->

                    <div>
                      <span class="text-white text-xs font-bold">
                        Chai's Fortnite Locker
                      </span>
                    </div>

                    <div class="text-white text-xss">
                      <span>
                        <span class="font-semibold">Total Cosmetics</span>:
                        1,994,
                        <span class="font-semibold">Filtered Cosmetics</span>:
                        1,777.
                      </span>
                    </div>

                    <!-- The actual image of the embed -->
                    <div class="flex justify-center pt-2">
                      <img src="../assets/locker.png" class="w-fit h-auto" />
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
              <div
                class="flex-none h-5 w-5 glass-thin-front rounded-full"
              ></div>
              <div class="h-5 w-full glass-thin-front rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Holds some additional information about what I made the bot for, and why it's important maybe? -->
    <div class="flex flex-row gap-5 justify-center items-stretch snap-center">
      <div
        class="basis-1/2 glass-thick p-5 rounded-xl shadow-xl text-center space-y-2 translation hover:scale-[1.03] duration-300 ease-out"
      >
        <div>
          <span class="text-white text-2xl font-semibold"> Why Chai? </span>
        </div>

        <div class="">
          <span class="text-gray-300">
            Some long text about why I made chai and why I think it's important
            and groundbreaking.
          </span>
        </div>
      </div>
      <div
        class="basis-1/2 glass-thick p-5 rounded-xl shadow-xl text-center translation hover:scale-[1.03] duration-300 ease-out"
      >
        <div>
          <span class="text-white text-2xl font-semibold">
            What's to Come?
          </span>
        </div>

        <div class="">
          <span class="text-gray-300">
            Some long text about what I plan to do with Chai in the future.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

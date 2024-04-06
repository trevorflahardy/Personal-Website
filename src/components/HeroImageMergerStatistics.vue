<template>
    <div class="glass-thick w-full p-5 snap-center space-y-2 rounded-xl shadow-xl">
        <div class="text-center">
            <span class="text-white text-2xl font-semibold">
                How Does it Work?
            </span>
        </div>

        <div>
            <span class="text-gray-300">
                Image Merger is centered around safe parallelization. Every subprocess does not rely on any shared
                state, so any given subprocess is free to place pixels onto the final image as it pleases. This
                allows for a linear speedup with the number of cores available (<span class="italic">If you're
                    feeling nerdy, you can check out how this is done through <a
                        href="https://docs.rs/image-merger/latest/image_merger/raw/struct.ImageCell.html"
                        class="font-medium underline decoration-green-400">ImageCells</a></span>). Alongside close
                attention to memory management and bulk operations, Image Merger is able to achieve fantastic
                performance.
            </span>
        </div>

        <div>
            <span class="text-white text-xl font-medium">
                How Fast is it though?
            </span>
        </div>

        <div>
            <span class="text-gray-300">
                Fantastic question! You can generate a merged image with 10,000 sub images of 100x100 pixels in
                <span class="font-medium text-green-400">82 ms</span>! That's <span
                    class="font-medium text-green-400">8.2
                    microseconds</span> per image, or <span class="font-medium text-green-400">121,951 images per
                    second</span>, assuming no overhead!
            </span>
        </div>
    </div>
</template>
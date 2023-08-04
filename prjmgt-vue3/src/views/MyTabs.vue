<template>
<div id="dynamic-component-demo" class="demo">
  <button
     v-for="tab in tabs"
     :key="tab"
     :class="['tab-button', { active: currentTab === tab }]"
     @click="currentTab = tab"
   >
    {{ tab }}
  </button>

  <component :is="currentTabComponent" class="tab"></component>
</div>
</template>
<script>
import {createApp } from 'vue'
const app = createApp({
  data() {
    return {
      currentTab: "Home",
      tabs: ["Home", "Posts", "Archive"],
    };
  },
  computed: {
    currentTabComponent() {
      return "tab-" + this.currentTab.toLowerCase();
    },
  },
});

app.component("tab-home", {
  template: `<div class="demo-tab">Home component</div>`,
});
app.component("tab-posts", {
  template: `<div class="dynamic-component-demo-posts-tab">
    <ul class="dynamic-component-demo-posts-sidebar">
      <li
        v-for="post in posts"
        :key="post.id"
        :class="{
          'dynamic-component-demo-active': post === selectedPost
        }"
        @click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="dynamic-component-demo-post-container">
      <div v-if="selectedPost" class="dynamic-component-demo-post">
        <h3>{{ selectedPost.title }}</h3>
        <div v-html="selectedPost.content"></div>
      </div>
      <strong v-else>
        Click on a blog title to the left to view it.
      </strong>
    </div>
  </div>`,
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Cat Ipsum",
          content:
            "<p>Dont wait for the storm to pass, dance in the rain kick upKitty poochy kitten around</p>",
        },
        {
          id: 2,
          title: "Hipster Ipsum",
          content:
            "<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>",
        },
        {
          id: 3,
          title: "Cupcake Ipsum",
          content:
            "<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>",
        },
      ],
      selectedPost: null,
    };
  },
});
app.component("tab-archive", {
  template: `<div class="demo-tab">Archive component</div>`,
});

app.mount("#dynamic-component-demo");
</script>

<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
<template>
    <div class="p-tabview p-component">
        <ul ref="nav" class="p-tabview-nav" role="tablist">
            <li role="presentation" v-for="(tab, i) of tabs" :key="getKey(tab,i)" :class="[{'p-highlight': (d_activeIndex === i), 'p-disabled': isTabDisabled(tab)}]">
                <a role="tab" class="p-tabview-nav-link"  @keydown="onTabKeydown($event, i)" :tabindex="isTabDisabled(tab) ? null : '0'" :aria-selected="d_activeIndex === i" v-ripple>
                    <span class="p-tabview-title" @click="onTabClick($event, i)" v-if="tab.props && tab.props.header">{{tab.props.header}}</span>
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text p-button-sm" @click="onTabCloseClick($event, i)" v-if="tab.props && tab.props.header" />
                    <component :is="tab.children.header" v-if="tab.children && tab.children.header"></component>
                </a>
            </li>
            <li ref="inkbar" class="p-tabview-ink-bar"></li>
        </ul>
        <div class="p-tabview-panels">
            <template v-for="(tab, i) of tabs" :key="getKey(tab,i)">
                <div  class="p-tabview-panel" role="tabpanel" v-if="lazy ? (d_activeIndex === i) : true" v-show="lazy ? true: (d_activeIndex === i)">
                    <component :is="tab"></component>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import {DomHandler} from 'primevue/utils';
import Ripple from 'primevue/ripple';
export default {
    name: 'TabView',
    emits: ['update:activeIndex', 'tab-change', 'tab-click', 'tab-close'],
    props: {
        activeIndex: {
            type: Number,
            default: 0
        },
        lazy: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            d_activeIndex: this.activeIndex
        }
    },
    watch: {
        activeIndex(newValue) {
            this.d_activeIndex = newValue;
        }
    },
    updated() {
        this.updateInkBar();
    },
    mounted() {
        this.updateInkBar();
    },
    methods: {
        onTabCloseClick(event, i) {
            this.$emit('tab-close', {
                    originalEvent: event,
                    index: i
                });
        },
        onTabClick(event, i) {
            if (!this.isTabDisabled(this.tabs[i]) && i !== this.d_activeIndex) {
                this.d_activeIndex = i;
                this.$emit('update:activeIndex', this.d_activeIndex);
                this.$emit('tab-change', {
                    originalEvent: event,
                    index: i
                });
            }
            this.$emit('tab-click', {
                originalEvent: event,
                index: i
            });
        },
        onTabKeydown(event, i) {
            if (event.which === 13) {
                this.onTabClick(event, i);
            }
        },
        updateInkBar() {
            let tabHeader = this.$refs.nav.children[this.d_activeIndex];
            this.$refs.inkbar.style.width = DomHandler.getWidth(tabHeader) + 'px';
            this.$refs.inkbar.style.left =  DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.$refs.nav).left + 'px';
        },
        getKey(tab, i) {
            return (tab.props && tab.props.header) ? tab.props.header : i;
        },
        isTabDisabled(tab) {
            return (tab.props && tab.props.disabled);
        },
        isTabPanel(child) {
            return child.type.name === 'TabPanel'
        }
    },
    computed: {
        tabs() {
            const tabs = []
            this.$slots.default().forEach(child => {
                    if (this.isTabPanel(child)) {
                        tabs.push(child);
                    }
                    else if (child.children && child.children instanceof Array) {
                        child.children.forEach(nestedChild => {
                            if (this.isTabPanel(nestedChild)) {
                                tabs.push(nestedChild)
                            }
                        });
                    }
                }
            )
            return tabs;
        },
    },
    directives: {
        'ripple': Ripple
    }
}
</script>

<style>
.p-tabview-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-wrap: wrap;
}
.p-tabview-nav-link {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    overflow: hidden;
}
.p-tabview-ink-bar {
    display: none;
    z-index: 1;
}
.p-tabview-nav-link:focus {
    z-index: 1;
}
.p-tabview-title {
    line-height: 1;
}
</style>
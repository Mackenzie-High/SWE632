<template>
    <div>
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
                <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                    <li><router-link to="/">Data Sets</router-link></li>
                    <li><router-link to="/maps">Maps</router-link></li>
                    <li><router-link to="/map">Map</router-link></li>
                    <router-view></router-view>
                </ul>
            </div>
            
        </nav>
    </div>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

export default {
    data() {
        return {
        }
        
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import "../node_modules/uikit/src/less/uikit.less";
</style>
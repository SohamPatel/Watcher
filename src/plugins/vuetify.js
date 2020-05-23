import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#000401',
                secondary: '#E5E8E8',
                accent: '#8D9797',
                error: '#E71D36',
                warning: '#FF9F1C',
                info: '#2196f3',
                success: '#8bc34a'
            },
        },
    },
});

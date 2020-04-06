import Vue from "vue";

export const DatabasePlugin = {
    install() {
        Vue.getUserData = async function (userId) {
            var database = require('./database.json');
            for (let i = 0; i < database.length; i++) {
                const rec = database[i];
                if (rec.user_id === userId) {
                    return rec;
                }
            }
        }
    }
}

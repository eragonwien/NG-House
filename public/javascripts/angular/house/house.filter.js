angular
    .module('house')
    .filter('houseFilter', houseFilter);

function houseFilter() {

    /**
     * filter out all houses which belong to the user
     * @param {object[]} houses list of houses
     * @param {object} user user object
     */
    function filter(houses, user) {
        let result = [];
        houses.forEach(function (house) {
            if (!user || user.id != house.user_id) {
                result.push(house);
            }
        });
        return result;
    }

    return filter;
}
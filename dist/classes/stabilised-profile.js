var StabilizedProfile = (function () {
    function StabilizedProfile(firstName, lastName, image, email, id, gender) {
        this.images = new Array();
        this.emails = new Array();
        firstName ? this.firstName = firstName : null;
        lastName ? this.lastName = lastName : null;
        image ? this.images.push(image) : null;
        email ? this.emails.push(email) : null;
        id ? this.id = id : null;
        gender ? this.gender = gender : null;
    }
    return StabilizedProfile;
}());
export { StabilizedProfile };
//# sourceMappingURL=stabilised-profile.js.map
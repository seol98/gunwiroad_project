export const homeViewController = (request, response) => {
    const homeData = {
        data: [{ name: "철수" }, { name: "영희" }, { name: "민수" }],
    };
    response.render("home", homeData);
};

export const stampViewController = (request, response) => {
    response.render("stamp");
};

export const loginViewController = (request, response) => {
    response.render("login");
};

export const loginCallbackController = (request, response) => {
    response.render("loginCallback");
};

export const joinViewController = (request, response) => {
    response.render("join");
};

export const courseViewController = (request, response) => {
    response.render("course");
};

export const profileViewController = (request, response) => {
    response.render("profile");
};

export const qrViewController = (request, response) => {
    response.render("qr");
};

export const courseController = (request, response) => {
    response.render("course");
};

export const detailController = (request, response) => {
    response.render("detail");
};


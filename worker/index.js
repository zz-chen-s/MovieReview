const axios = require("axios");
const redisConnection = require("./redis-connection");
const data = require("./data");
const movieData = data.movie;
const userData = data.user;
const reviewData = data.review;

redisConnection.on("send-message-with-reply:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let type = message.data.type;
    let searchQuery = message.data.searchQuery;
    let movieResult;
    switch (type) {
        case "getMovieByName":
            movieResult = await movieData.getMovieByName(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: movieResult,
                eventName: eventName
            });
            break;
        case "getMovieById":
            movieResult = await movieData.getMovieById(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: movieResult,
                eventName: eventName
            });
            break;
        case "getTopRatedMovies":
            movieResult = await movieData.getTopRatedMovies(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: movieResult,
                eventName: eventName
            });
            break;
        default:
            break;
    }
});

redisConnection.on("user-data-with-reply:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let type = message.data.type;
    let searchQuery = message.data.searchQuery;
    let userResult;
    switch (type) {
        case "getUserByEmail":
            userResult = await userData.getUserByEmail(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: userResult,
                eventName: eventName
            });
            break;
        default:
            break;
    }
});

redisConnection.on("review-data-with-reply:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let type = message.data.type;
    let searchQuery = message.data.searchQuery;
    let reviewResult;
    switch (type) {
        case "getReviewByMovie":
            reviewResult = await reviewData.getReviedwByMovie(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: reviewResult,
                eventName: eventName
            });
            break;
        case "getReviewByAuthor":
            reviewResult = await reviewData.getReviedwByAuthor(searchQuery);
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: reviewResult,
                eventName: eventName
            });
            break;
        default:
            break;
    }
});
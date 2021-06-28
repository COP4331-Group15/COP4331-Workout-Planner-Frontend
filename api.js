exports.setApp = function (app, firebase) {
    app.post('/api/test', async (req, res, next) => {

        // Create a connection reference to the database
        var reference = firebase.database().ref();

        // Create the payload object we'll be returning
        var ret;

        // Attempt to get our test data
        try {
            // Await our data from /test
            var snap = await reference.child("test").get();
            // Our data exists, build our return object
            if(snap.exists()) {
                ret = {message: "Test Successful!", data: snap.val()}
            } else {
            // Our data doesn't exist, build our return object
                ret = {message: "Test Mostly Successful!"}
            }
        } catch (error) {
            // Something wrong happen :(
            ret = {message: "error", name: error.name, eMessage: error.message}
        }
        
        // (res)olve our query with a 200 (OK) status, returning a JSON object (ret)
        res.status(200).json(ret);
    })
}
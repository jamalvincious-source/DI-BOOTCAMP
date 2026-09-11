document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Form GET Example</title>
</head>
<body>
    <form action="" method="GET">
        <div>
            <label for="name">Name</label><br>
            <input type="text" id="name" name="name">
        </div>

        <div>
            <label for="message">Comments</label><br>
            <textarea id="message" name="message" rows="4" cols="30"></textarea>
        </div>

        <div>
            <input type="submit" value="Send">
        </div>
    </form>
</body>
</html>`);
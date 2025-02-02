const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 2010;
const users = require('./MOCK_DATA.json');

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // To handle JSON data in requests

// Routes
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// Params
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    return res.json(user);
});

// Grouping routes
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        return res.json(user);
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Remove user from the array
        const deletedUser = users.splice(index, 1);

        // Write to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to delete the user" });
            }
            return res.json({ status: "success", message: "User Deleted", user: deletedUser });
        });
    })
    .put((req, res) => {
        // PUT route for full user update
        const id = Number(req.params.id);
        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const updatedData = req.body;
        users[index] = updatedData; // Replace the entire user object

        // Write to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update the user" });
            }
            return res.json({ status: "success", message: "User Updated", user: users[index] });
        });
    })
    .patch((req, res) => {
        // PATCH route for partial user update
        const id = Number(req.params.id);
        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const updatedData = req.body;
        users[index] = { ...users[index], ...updatedData }; // Update user partially

        // Write to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update the user" });
            }
            return res.json({ status: "success", message: "User Updated", user: users[index] });
        });
    });

// POST request
app.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to add user" });
        }
        return res.json({ status: "successful", user: newUser });
    });
});

// Rest API for all users
app.get('/api/users', (req, res) => {
    return res.json(users);
});

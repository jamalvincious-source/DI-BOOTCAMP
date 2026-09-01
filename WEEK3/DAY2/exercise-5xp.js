// Retrieve the div and console.log it
let containerDiv = document.getElementById("container");
console.log(containerDiv);

// Change the name “Pete” to “Richard”
let lists = document.querySelectorAll(".list");
let peteLi = lists[0].children[1];
peteLi.textContent = "Richard";

// Delete the second <li> of the second <ul>
let secondUlSecondLi = lists[1].children[1];
secondUlSecondLi.remove();

// Change the name of the first <li> of each <ul> to your name
lists.forEach(ul => {
    ul.firstElementChild.textContent = "YourName"; // Replace with your actual name
});

// Add a class called student_list to both of the <ul>'s
lists.forEach(ul => {
    ul.classList.add("student_list");
});

// Add the classes university and attendance to the first <ul>
lists[0].classList.add("university", "attendance");

// Add a “light blue” background color and some padding to the <div>
containerDiv.style.backgroundColor = "light blue";
containerDiv.style.padding = "10px";

// Do not display the <li> that contains the text node “Dan”
let danLi = lists[0].lastElementChild;
danLi.style.display = "none";

// Add a border to the <li> that contains the text node “Richard”
let richardLi = lists[0].children[1];
richardLi.style.border = "1px solid black";

// Change the font size of the whole body
document.body.style.fontSize = "18px";

// Bonus: If the background color of the div is “light blue”, alert “Hello x and y”
if (containerDiv.style.backgroundColor === "light blue") {
    let users = [];
    lists.forEach(ul => {
        Array.from(ul.children).forEach(li => {
            if (li.style.display !== "none") {
                users.push(li.textContent);
            }
        });
    });
    alert(`Hello ${users.join(" and ")}`);
}
// 1 & 2. Create the Video class with constructor and watch method
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader =uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// 3. Instantiate a new Video instance and call the watch() method
const video1 = new Video("JS for Beginners", "Alice", 300);
video1.watch();

// 4. Instantiate a second Video instance with different values
const video2 = new Video("Advanced OOP Concepts", "Bob", 600);
video2.watch();

// 5. Bonus: Array storing data for five Video instances
// The best data structure to save this information is an array of objects, 
// where each object holds key-value pairs corresponding to the class parameters.
const videoData = [
  { title: "Learn React in 30 Minutes", uploader: "Charlie", time: 1800 },
  { title: "CSS Grid Tutorial", uploader: "Diana", time: 900 },
  { title: "Node.js Crash Course", uploader: "Evan", time: 2400 },
  { title: "Python vs JavaScript", uploader: "Fiona", time: 1200 },
  { title: "Understanding Async/Await", uploader: "George", time: 750 }
];

// 6. Bonus: Loop through the array to instantiate those instances and call watch()
const videoInstances = videoData.map(data => {
  const videoInstance = new Video(data.title, data.uploader, data.time);
  videoInstance.watch();
  return videoInstance;
});
// search.js
document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", function(event) {
            const query = event.target.value;
            fetch(`search.php?query=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Search results:", data);
                    // Display the search results
                    // You can update this part to display the results on the page
                })
                .catch(error => console.error("Error fetching search results:", error));
        });
    }
});
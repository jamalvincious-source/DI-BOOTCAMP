import requests

def get_gifs():
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    
    # 1. Ask the user for a search term or phrase
    user_query = input("Enter a search term or phrase for gifs: ").strip()
    
    gifs = []
    
    if user_query:
        # Build search URL using the user's query
        search_url = f"https://api.giphy.com/v1/gifs/search?q={user_query}&api_key={api_key}"
        response = requests.get(search_url)
        
        if response.status_code == 200:
            data = response.json()
            gifs = data.get("data", [])
            
    # 2. If the term doesn't exist, input is empty, or no results found
    if not user_query or not gifs:
        print(f"\nCouldn't find the requested term or phrase '{user_query}'. Showing trending gifs of the day instead:")
        trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={api_key}"
        trending_response = requests.get(trending_url)
        
        if trending_response.status_code == 200:
            gifs = trending_response.json().get("data", [])
        else:
            print(f"Failed to fetch trending gifs. Status code: {trending_response.status_code}")
            return
            
    # 3. Display the resulting gifs
    print(f"\nFound {len(gifs)} gifs:")
    for i, gif in enumerate(gifs, 1):
        title = gif.get('title', 'No title')
        url = gif.get('url', 'No URL')
        print(f"{i}. {title} - {url}")

if __name__ == "__main__":
    get_gifs()
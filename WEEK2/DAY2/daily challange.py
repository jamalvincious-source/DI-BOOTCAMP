import math


class Pagination:

  def __init__(self, items=None, page_size=10):
    self.items = items if items is not None else []
    self.page_size = int(page_size)
    self.current_idx = 0

    # Calculate total pages using math.ceil
    self.total_pages = math.ceil(len(self.items) / self.page_size) or 1

  def get_visible_items(self):
    start = self.current_idx * self.page_size
    end = start + self.page_size
    return self.items[start:end]

  # Alias for camelCase method chaining support
  getVisibleItems = get_visible_items

  def go_to_page(self, page_num):
    page_num = int(page_num)
    if page_num < 1 or page_num > self.total_pages:
      raise ValueError(
          f"Page number {page_num} is out of range (1 - {self.total_pages})."
      )
    self.current_idx = page_num - 1
    return self  # Enabled method chaining for go_to_page/goToPage

  goToPage = go_to_page

  def first_page(self):
    self.current_idx = 0
    return self

  firstPage = first_page

  def last_page(self):
    self.current_idx = self.total_pages - 1
    return self

  lastPage = last_page

  def next_page(self):
    if self.current_idx < self.total_pages - 1:
      self.current_idx += 1
    return self

  nextPage = next_page

  def previous_page(self):
    if self.current_idx > 0:
      self.current_idx -= 1
    return self

  previousPage = previous_page

  def __str__(self):
    return "\n".join(str(item) for item in self.get_visible_items())


# --- Test Cases ---
if __name__ == "__main__":
  alphabetList = list("abcdefghijklmnopqrstuvwxyz")
  p = Pagination(alphabetList, 4)

  # Basic navigation tests
  print(p.get_visible_items())  # ['a', 'b', 'c', 'd']

  p.next_page()
  print(p.get_visible_items())  # ['e', 'f', 'g', 'h']

  p.last_page()
  print(p.get_visible_items())  # ['y', 'z']

  # Bonus: Method Chaining test
  p.first_page()
  print(
      p.nextPage().nextPage().nextPage().getVisibleItems()
  )  # ['m', 'n', 'o', 'p']


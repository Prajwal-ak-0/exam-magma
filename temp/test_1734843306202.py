class CustomArray:
    def __init__(self):
        self.array = []

    def insert(self, element, position):
        """Inserts an element at a given position."""
        if position < 0 or position > len(self.array):
            raise IndexError("Position out of bounds")
        self.array.insert(position, element)

    def delete(self, position):
        """Deletes an element at a specific position."""
        if position < 0 or position >= len(self.array):
            raise IndexError("Position out of bounds")
        self.array.pop(position)

    def linear_search(self, element):
        """Searches for an element using linear search."""
        for index, value in enumerate(self.array):
            if value == element:
                return index
        return -1

    def binary_search(self, element):
        """Searches for an element using binary search. Assumes the array is sorted."""
        low, high = 0, len(self.array) - 1
        while low <= high:
            mid = (low + high) // 2
            if self.array[mid] == element:
                return mid
            elif self.array[mid] < element:
                low = mid + 1
            else:
                high = mid - 1
        return -1

    def bubble_sort(self):
        """Sorts the array using bubble sort."""
        n = len(self.array)
        for i in range(n):
            for j in range(0, n - i - 1):
                if self.array[j] > self.array[j + 1]:
                    self.array[j], self.array[j + 1] = self.array[j + 1], self.array[j]

    def selection_sort(self):
        """Sorts the array using selection sort."""
        n = len(self.array)
        for i in range(n):
            min_index = i
            for j in range(i + 1, n):
                if self.array[j] < self.array[min_index]:
                    min_index = j
            self.array[i], self.array[min_index] = self.array[min_index], self.array[i]

    def rotate(self, k):
        """Rotates the array by k positions."""
        n = len(self.array)
        k %= n  # Handle cases where k > n
        self.array = self.array[-k:] + self.array[:-k]


# Example usage of CustomArray
if __name__ == "__main__":
    arr = CustomArray()

    # Insert elements
    arr.insert(10, 0)
    arr.insert(20, 1)
    arr.insert(30, 2)
    print("Array after insertions:", arr.array)  # Output: [10, 20, 30]

    # Delete element
    arr.delete(1)
    print("Array after deletion:", arr.array)  # Output: [10, 30]

    # Linear search
    index = arr.linear_search(10)
    print("Index of 10 (linear search):", index)  # Output: 0

    # Bubble sort
    arr.bubble_sort()
    print("Array after bubble sort:", arr.array)  # Output: [10, 30]

    # Binary search
    index = arr.binary_search(30)
    print("Index of 30 (binary search):", index)  # Output: 1

    # Rotate array
    arr.rotate(1)
    print("Array after rotation by 1 position:", arr.array)  # Output: [30, 10]
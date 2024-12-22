class Array:
    def __init__(self):
        self.data = []

    def insert(self, position, value):
        """Insert a value at the specified position."""
        self.data.insert(position, value)

    def delete(self, position):
        """Delete the value at the specified position."""
        if 0 <= position < len(self.data):
            self.data.pop(position)

    def linear_search(self, value):
        """Search for a value using linear search."""
        for index, elem in enumerate(self.data):
            if elem == value:
                return index
        return -1

    def binary_search(self, value):
        """Search for a value using binary search. Array is sorted before searching."""
        self.selection_sort()  # Ensure the array is sorted
        left, right = 0, len(self.data) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if self.data[mid] == value:
                return mid
            elif self.data[mid] < value:
                left = mid + 1
            else:
                right = mid - 1
        return -1

    def bubble_sort(self):
        """Sort the array using bubble sort."""
        n = len(self.data)
        for i in range(n):
            for j in range(0, n - i - 1):
                if self.data[j] > self.data[j + 1]:
                    self.data[j], self.data[j + 1] = self.data[j + 1], self.data[j]

    def selection_sort(self):
        """Sort the array using selection sort."""
        n = len(self.data)
        for i in range(n):
            min_idx = i
            for j in range(i + 1, n):
                if self.data[j] < self.data[min_idx]:
                    min_idx = j
            self.data[i], self.data[min_idx] = self.data[min_idx], self.data[i]

    def rotate(self, k):
        """Rotate the array by k positions."""
        if len(self.data) == 0:
            return
        k = k % len(self.data)
        self.data = self.data[-k:] + self.data[:-k]


# Example usage of the Array class
if __name__ == "__main__":
    arr = Array()
    arr.insert(0, 10)
    arr.insert(1, 20)
    arr.insert(2, 30)
    arr.delete(1)
    print("Array after deletion:", arr.data)  # Output: [10, 30]

    index = arr.linear_search(10)
    print("Index of 10 (linear search):", index)  # Output: 0

    arr.bubble_sort()
    print("Array after bubble sort:", arr.data)  # Output: [10, 30]

    arr.insert(1, 30)  # Preparing for binary search, insert a duplicate
    index = arr.binary_search(30)
    print("Index of 30 (binary search):", index)  # Output: 1 or 2 depending on sorting

    arr.rotate(1)
    print("Array after rotation by 1 position:", arr.data)  # Output: [30, 10]
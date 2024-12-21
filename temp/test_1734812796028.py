class CustomArray:
    def __init__(self):
        self.array = []

    def insert(self, position, value):
        """Inserts an element at a given position."""
        if position < 0 or position > len(self.array):
            raise IndexError("Position out of bounds")
        self.array.insert(position, value)

    def delete(self, position):
        """Deletes an element at a specific position."""
        if position < 0 or position >= len(self.array):
            raise IndexError("Position out of bounds")
        self.array.pop(position)

    def linear_search(self, value):
        """Searches for an element using linear search."""
        for index, element in enumerate(self.array):
            if element == value:
                return index
        return -1

    def binary_search(self, value):
        """Searches for an element using binary search. Assumes the array is sorted."""
        low, high = 0, len(self.array) - 1
        while low <= high:
            mid = (low + high) // 2
            if self.array[mid] == value:
                return mid
            elif self.array[mid] < value:
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
        return self.array

    def selection_sort(self):
        """Sorts the array using selection sort."""
        n = len(self.array)
        for i in range(n):
            min_index = i
            for j in range(i + 1, n):
                if self.array[j] < self.array[min_index]:
                    min_index = j
            self.array[i], self.array[min_index] = self.array[min_index], self.array[i]
        return self.array

    def rotate(self, k):
        """Rotates the array by k positions."""
        n = len(self.array)
        k %= n  # Handle cases where k > n
        self.array = self.array[-k:] + self.array[:-k]
        return self.array

# Main function to test the implementation
if __name__ == "__main__":
    custom_array = CustomArray()

    # Insert elements
    custom_array.insert(0, 5)
    custom_array.insert(1, 10)
    custom_array.insert(1, 7)
    print(custom_array.array)  # Output: [5, 7, 10]

    # Delete element
    custom_array.delete(1)
    print(custom_array.array)  # Output: [5, 10]

    # Linear search
    index = custom_array.linear_search(10)
    print(index)  # Output: 1

    # Binary search (requires sorted array)
    custom_array.bubble_sort()
    index = custom_array.binary_search(10)
    print(index)  # Output: 1

    # Bubble sort
    sorted_array = custom_array.bubble_sort()
    print(sorted_array)  # Output: [5, 10]

    # Rotate array
    rotated_array = custom_array.rotate(1)
    print(rotated_array)  # Output: [10, 5]
class Array:
    def __init__(self):
        self.data = []

    def insert(self, position, value):
        self.data.insert(position, value)

    def delete(self, position):
        if 0 <= position < len(self.data):
            self.data.pop(position)

    def linear_search(self, value):
        for index, elem in enumerate(self.data):
            if elem == value:
                return index
        return -1

    def binary_search(self, value):
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
        n = len(self.data)
        for i in range(n):
            for j in range(0, n-i-1):
                if self.data[j] > self.data[j+1]:
                    self.data[j], self.data[j+1] = self.data[j+1], self.data[j]

    def selection_sort(self):
        n = len(self.data)
        for i in range(n):
            min_idx = i
            for j in range(i+1, n):
                if self.data[j] < self.data[min_idx]:
                    min_idx = j
            self.data[i], self.data[min_idx] = self.data[min_idx], self.data[i]

    def rotate(self, k):
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

    index = arr.binary_search(30)
    print("Index of 30 (binary search):", index)  # Output: 1

    arr.rotate(1)
    print("Array after rotation by 1 position:", arr.data)  # Output: [30, 10]
    
    # Additional test cases
    arr.insert(0, 5)
    arr.insert(1, 15)
    arr.insert(2, 25)
    arr.delete(2)
    print("Array after inserting 5, 15, 25 and deleting index 2:", arr.data)  # Expected: [5, 15, 30]
    index = arr.linear_search(15)
    print("Index of 15 (linear search):", index)  # Expected: 1
    arr.bubble_sort()
    print("Array after bubble sort:", arr.data)  # Expected: [5, 15, 30]
    index = arr.binary_search(5)
    print("Index of 5 (binary search):", index)  # Expected: 0
    arr.rotate(2)
    print("Array after rotation by 2 positions:", arr.data)  # Expected: [30, 5, 15]
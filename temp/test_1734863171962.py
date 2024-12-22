def factorial(n):
    """Calculate the factorial of a number."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)


# Example usage
if __name__ == "__main__":
    try:
        number = 7  # Changed from 5 to 7 to test a different case
        result = factorial(number)
        print(f"The factorial of {number} is {result}")
    except ValueError as e:
        print(e)
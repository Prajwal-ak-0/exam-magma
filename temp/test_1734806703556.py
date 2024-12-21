class TreeNode:
    def __init__(self, value):
        self.val = value
        self.left = None
        self.right = None


def construct_binary_tree(preorder, inorder):
    if not preorder or not inorder:
        return None

    root_val = preorder.pop(0)
    root = TreeNode(root_val)
    inorder_index = inorder.index(root_val)

    root.left = construct_binary_tree(preorder, inorder[:inorder_index])
    root.right = construct_binary_tree(preorder, inorder[inorder_index + 1:])
    return root


def find_height_and_diameter(root):
    def dfs(node):
        if not node:
            return 0, 0

        left_height, left_diameter = dfs(node.left)
        right_height, right_diameter = dfs(node.right)

        height = 1 + max(left_height, right_height)
        diameter = max(left_height + right_height + 1, left_diameter, right_diameter)
        return height, diameter

    return dfs(root)


def level_order_spiral(root):
    if not root:
        return []

    from collections import deque

    result, queue, left_to_right = [], deque([root]), True
    while queue:
        level_size = len(queue)
        level = deque()
        for _ in range(level_size):
            node = queue.popleft()
            if left_to_right:
                level.append(node.val)
            else:
                level.appendleft(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(level))
        left_to_right = not left_to_right
    return result


def is_balanced(root):
    def check(node):
        if not node:
            return 0, True

        left_height, left_balanced = check(node.left)
        right_height, right_balanced = check(node.right)

        balanced = left_balanced and right_balanced and abs(left_height - right_height) <= 1
        return 1 + max(left_height, right_height), balanced

    _, balanced = check(root)
    return balanced


def find_lca(root, p, q):
    if not root or root.val == p or root.val == q:
        return root

    left = find_lca(root.left, p, q)
    right = find_lca(root.right, p, q)

    if left and right:
        return root
    return left or right


def print_all_paths(root):
    def dfs(node, path, paths):
        if not node:
            return

        path.append(node.val)
        if not node.left and not node.right:
            paths.append(list(path))
        else:
            dfs(node.left, path, paths)
            dfs(node.right, path, paths)
        path.pop()

    paths = []
    dfs(root, [], paths)
    return paths

# Hardcoded Input and Execution
if __name__ == "__main__":
    # Test Case 1
    inorder = [4, 2, 5, 1, 6, 3]
    preorder = [1, 2, 4, 5, 3, 6]

    root = construct_binary_tree(preorder[:], inorder[:])

    height, diameter = find_height_and_diameter(root)
    print(f"Height: {height}")
    print(f"Diameter: {diameter}")

    spiral_order = level_order_spiral(root)
    print(f"Spiral Order: {spiral_order}")

    balanced = is_balanced(root)
    print(f"Is Balanced: {balanced}")

    p, q = 4, 5
    lca = find_lca(root, p, q)
    print(f"Lowest Common Ancestor of {p} and {q}: {lca.val if lca else None}")

    paths = print_all_paths(root)
    print(f"Root to Leaf Paths: {paths}")

    # Additional Test Case 2
    inorder2 = [2, 1]
    preorder2 = [1, 2]

    root2 = construct_binary_tree(preorder2[:], inorder2[:])

    height2, diameter2 = find_height_and_diameter(root2)
    print(f"Height: {height2}")
    print(f"Diameter: {diameter2}")

    spiral_order2 = level_order_spiral(root2)
    print(f"Spiral Order: {spiral_order2}")

    balanced2 = is_balanced(root2)
    print(f"Is Balanced: {balanced2}")

    p2, q2 = 2, 1
    lca2 = find_lca(root2, p2, q2)
    print(f"Lowest Common Ancestor of {p2} and {q2}: {lca2.val if lca2 else None}")

    paths2 = print_all_paths(root2)
    print(f"Root to Leaf Paths: {paths2}")
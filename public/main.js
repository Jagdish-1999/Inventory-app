function deleteProduct(id) {
    const ans = confirm("Are you sure want to delete this product?")
    if (ans) {
        fetch(`/delete/${id}`, { method: "POST" }).then((res) => {
            if (res.ok) {
                location.reload();
            }
        })
    }
}
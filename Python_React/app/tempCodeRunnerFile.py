if __name__ == "__main__":
    app = main()
    import uvicorn
    uvicorn.run(app, host="http://localhost", port=8000)
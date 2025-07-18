class UploadOnS3 {
    async uploadDocuments(formData) {
        try {
            const res = await fetch('/api/v1/documents/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log('error in s3 upload document service, error:', err);
            throw err;
        }
    }

    async deleteDocument(s3Name, docName) {
        try {
            const res = await fetch('/api/v1/documents/delete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ s3Name, fileName: docName }),
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.log('error in s3 deleting document service, error:', err);
            throw err;
        }
    }
}

export const uploadOnS3Service = new UploadOnS3();

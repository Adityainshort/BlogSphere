import { Client,Databases , Storage , Query , ID } from "appwrite";
import conf from '../conf/conf'

export class Services {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost ({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    status,
                    content,
                    featuredImage,
                    userId
                }
            )
        } catch (e) {   
            console.log("Create Post Error", e);
        }
    }

    async updatePost (slug,{title,content,feturedImage,status,userId}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    status,
                    content,
                    feturedImage,
                    userId,
                }
            )
        } catch (e) {
            console.log("Update Post Error", e);
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (e) {
            console.log("Delete Post Error", e);
            return false;
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (e) {
            console.log("Get Posts Error", e);
            return false;
        }
    }   

    async getPosts (queries =[Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (e) {
            console.log("Get Posts Error", e);
            return false;
        }
    }

    async uploadFile (file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (e) {
            console.log("Upload File Error", e);
            return false;
        }
    }

    async deleteFile (fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (e) {
            console.log("Delete File Error", e);
            return false;
        }
    }

    getFilePreview (fileId) {
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId,
                400,
                200,
            ).href
        } catch (e) {
            console.log("Get File Preview Error", e);
            return false;
        }
    }
    
}

const service = new Services();
export default service
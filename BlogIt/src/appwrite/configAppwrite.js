/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import config from "../config/config";
import { Client, ID, Databases, Storage, Query , UserId } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({ title, slug, content, featuredImage }) {
        try {
            const post = await this.databases.createDocument(config.appwriteCollectionId, config.appwriteDatabaseId, slug, {
                title,
                slug,
                content,
                featuredImage,
                UserId
            });
            return post;
        } catch (error) {
            console.log("appwrite service create post error")
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}) { //slug is being used as a Id we are not using Id.unique here //no user id since we will get update access to only those who wrote the blog
        try {
            const post = await this.databases.updateDocument(config.appwriteCollectionId, config.appwriteDatabaseId, slug, {
                title,
                content,
                featuredImage,
                status,
                UserId
            });
            return post;            
        } catch (error){
            console.log("appwrite service update post error")
            throw error;
        }
    }

    async deletePost(slug) {    
        try {
            await this.databases.deleteDocument(config.appwriteCollectionId, config.appwriteDatabaseId, slug);
            return true;
        } catch (error){
            console.log("appwrite service delete post error")
            return false;
        }
    }
    async getPost(slug) {
        try {
           await this.databases.getDocument(config.appwriteCollectionId, config.appwriteDatabaseId, slug);
           
        } catch (error){
            console.log("appwrite service get post error")
            throw error;
        }
    }

    //queries all listing all active posts
    //you can access these keys like status only if you made indexes in appwrite
    async getPosts(queries=[Query.equal("status","active")]) {  
        try {
           return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries);
        } catch (error){
            console.log("appwrite service get posts error")
            throw error;
        }
    }


    //File upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            
            );
        } catch (error){
            console.log("appwrite service upload file error")
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error){
            console.log("appwrite service delete file error")
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
    
}

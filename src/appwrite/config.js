import config from "../config/config";
import { Client, ID, Databases ,Storage ,Query } from "appwrite";

export class Service{
    Client = new Client()
    databases
    bucket
    constructor(){
        this.Client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
        
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status,
                            userId
                        }
                    )
        } 
        catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
        }
    }

    async updatePost (slug,{title,slug,content,featuredImage,status}){
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId,
                confirm.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            return true
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
            return false
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
            return false
        }
    }

    async getPosts(queries= [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteProjectId,
                queries
            )
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
            return false
        }
    }

    //image upload methods
    async uploadFiles(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
            return false
        }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('Appwrite Service Error. Error: ',error);  
            return false
        }
    }
    
    getFilePreview(fileId){
        this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service
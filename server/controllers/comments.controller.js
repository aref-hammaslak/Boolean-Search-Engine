import { Parser } from "expr-eval";
import { CommentModel } from "../models/comment.model.js";
import { WordModel } from "../models/word.model.js";
import { Query } from "mongoose";

function evaluateExpression(expression, variables, wholeSet) {
    
    const parser = new Parser();
    expression = parser.parse(expression);

    // get the intersection of two set/array)
    parser.binaryOps['-'] = (a, b) => a.filter(x => b.includes(x));
    // get the union of two set/array 
    parser.binaryOps['+'] = (a, b) => [...new Set([...a, ...b])];
    // get the complement of set/array
    parser.unaryOps['not'] = (a) => wholeSet.filter(x => !a.includes(x));


    const resulte = expression.evaluate(variables);
    return resulte;
}

function substitueWordsWithVariables(expression) {
    const wordRegex = /"([^"]+)"/g;

    let match;
    let variables = [];
    let counter = 1;

    // Replace words with variables
    const newExpression = expression.replace(wordRegex, (match, word) => {
        const variable = `w${counter}`;
        variables.push([variable, word]);
        counter++;
        return variable;
    });

    return [
        newExpression,
        variables
    ];

}

export async function getAllComments(req, res) {

    let { expression } = req.query;
    let limit = parseInt(req.query.limit) || 10
    let page = parseInt(req.query.page) - 1 || 0
    expression = expression.replaceAll().replace(/and/g, '-').replace(/or/g, '+');
    
    
    const [wordsExpression, variables] = substitueWordsWithVariables(expression)


    try {

        const variablesWithData = {}

        for (let [variable, word] of variables) {
            word = word.trim();
            let item = await WordModel.findOne({ word }) || undefined ;
            variablesWithData[variable.trim()] = item?.presentAt || [];
        }

        
        const allCommentIds = expression.length && (await CommentModel.find({}).select('_id')).map(doc => doc._id);

        // each var is a set of commentIds and wordsExpression is an boolean expresion of vaiables
        const commentIds = expression.length && evaluateExpression(wordsExpression, variablesWithData, allCommentIds);

        const query = expression.length === 0 ? {} : {
            _id: {
                $in: commentIds
            }
        }
        const comments = await CommentModel.find(expression.length === 0 ? {} : query).skip(limit*page).limit(10);

        // get count of comments matchig with existance of words
        const commentsCounts = await CommentModel.countDocuments(query)

        res.send({
            success: true,
            payload: {
                comments,
                total: commentsCounts,
                page: page + 1,
                limit
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message
        })
    }


}

export async function getCommentsCount(req, res) {

    try {
        
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                error :error.message
            }
        )
    }
}
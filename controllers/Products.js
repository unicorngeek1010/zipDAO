import zipdao from "../config/database.js";
export const getAllProducts = async (req, res) => {
    try {
        let filters = req.body;
        console.log(filters);

        const coll = zipdao.collection('ZipAggregates');

        let options = [];
        let pageSize = 10;
        let skip = 0;
        let totalCount = 0;
        options.push({"State" : {$ne : ""}})
        if(filters.averageIncome) {
            if(filters.averageIncome.min > 0) {
                options.push({"Average Income per Person":{$gt: Number(filters.averageIncome.min)}})
            }
            if(filters.averageIncome.max > 0) {
                options.push({"Average Income per Person":{$lt:  Number(filters.averageIncome.max)}})            
            }         
        }
        if(filters.amountContributions) {
            if(filters.amountContributions.min > 0) {
                options.push({"Amount of Charitable Contributions":{$gt: filters.amountContributions.min}})
            }
            if(filters.amountContributions.max > 0) {
                options.push({"Amount of Charitable Contributions":{$lt: filters.amountContributions.max}})            
            }            
        }
        if(filters.contributions) {
            if(filters.contributions.min > 0) {
                options.push({"# of Charitable Contributions":{$gt: filters.contributions.min}})
            }
            if(filters.contributions.max > 0) {
                options.push({"# of Charitable Contributions":{$lt: filters.contributions.max}})            
            }
        }
        if(filters.perReturn) {
            if(filters.perReturn.min > 0) {
                options.push({"People Per Return":{$gt: filters.perReturn.min}})
            }
            if(filters.perReturn.max > 0) {
                options.push({"People Per Return":{$lt: filters.perReturn.max}})            
            }
        }
        if(filters.elderlyPercentage) {
            if(filters.elderlyPercentage.min > 0) {
                options.push({"Elderly Percent":{$gt: filters.elderlyPercentage.min}})
            }
            if(filters.elderlyPercentage.max > 0)
            {
                options.push({"Elderly Percent":{$lt: filters.elderlyPercentage.max}})
            }                       
        }
        if(filters.grossPercentage) {
            if(filters.grossPercentage.min > 0){
                options.push({"Charity Amount of Total Gross Percent":{$gt: filters.grossPercentage.min}})
            }
            if(filters.grossPercentage.max > 0) {
                options.push({"Charity Amount of Total Gross Percent":{$lt: filters.grossPercentage.max}})            
            }            
        }
        if(filters.contirubtionsPercentage) {
            if(filters.contirubtionsPercentage.min > 0)
            {
                options.push({"Charitable Contributions Percent":{$gt: filters.contirubtionsPercentage.min}})
            }
            if(filters.contirubtionsPercentage.max > 0) {
                options.push({"Charitable Contributions Percent":{$lt: filters.contirubtionsPercentage.max}})            
            }            
        }
        if(filters.ownersPercentage) {
            if(filters.ownersPercentage.min > 0) {
                options.push({"Property Owners Percent":{$gt: filters.ownersPercentage.min}})
            }
            if(filters.ownersPercentage.max > 0) {
                options.push({"Property Owners Percent":{$lt: filters.ownersPercentage.max}})            
            }            
        }
        if(filters.rank) {
            if(filters.rank.min > 0) {
                options.push({"rank":{$gt: filters.rank.min}})
            }
            if( filters.rank.max > 0)
            {
                options.push({"rank":{$lt: filters.rank.max}})            
            }            
        }
        if(filters.owners) {
            if(filters.owners.min > 0) {
                options.push({"# of Property Owners":{$gt: filters.owners.min}})
            }
            if(filters.owners.max > 0) {
                options.push({"# of Property Owners":{$lt: filters.owners.max}})            
            }            
        }
        if(filters.elderly) {
            if(filters.elderly.min > 0) {
                options.push({"# of Elderly":{$gt: filters.elderly.min}})
            }
            if(filters.elderly.max > 0) {
                options.push({"# of Elderly":{$lt: filters.elderly.max}})            
            }
        }
        if(filters.people) {
            if(filters.people.min > 0) {
                options.push({"# of People":{$gt: filters.people.min}})
            }
            if(filters.people.max > 0)
            {
                options.push({"# of People":{$lt: filters.people.max}})            
            }           
        }
        if(filters.returns) {
            if(filters.returns.min > 0) {
                options.push({"# of Returns":{$gt: filters.returns.min}})
            }
            if(filters.returns.max > 0)
            {
                options.push({"# of Returns":{$lt: filters.returns.max}})
            }                    
        }
        if(filters.grossIncome) {
            if(filters.grossIncome.min > 0)
            {
                options.push({"Gross Income":{$gt:  Number(filters.grossIncome.min)}})
            }
            if(filters.grossIncome.max > 0)
            {
                options.push({"Gross Income":{$lt:  Number(filters.grossIncome.max)}})  
            }
        }
        if(filters.state && filters.state.length > 0) {
            options.push({"State" : {$in : filters.state}})
        } 
        if(filters.zipCode && filters.zipCode !="") {
            options.push({"Zip Code" : {$eq : filters.zipCode}})
        }
        if(filters.tier && filters.tier !="") {
            options.push({"Tier" : {$eq : filters.tier}})
        }        
        if(filters.pagination && filters.pagination.pageSize) {
            pageSize = Number(filters.pagination.pageSize);
        }
        if(filters.pagination.current) {
            skip = (filters.pagination.current - 1) * pageSize;
        } 
        let order = {'# of Returns': -1}
        
        if(filters.field && filters.field != "") {
            if(filters.order == "ascend") {
                order = {[filters.field] : 1};
            } else {
                order = { [filters.field] : -1};
            }
        }
        //const dataaa = await coll.find(filterOption).toArray();
        console.log(options)
        const pipeline = [
            { $match: { $and : options } },            
            {$sort : order},
            {$skip: skip},
            {$limit : pageSize}
        ];
        const totalCountPipeLine = [
            { $match: { $and : options } },
            {$count : 'totalCount'}
        ]
        const aggCursor = await coll.aggregate(pipeline);
        let data = []
        for await (let doc of aggCursor) {
            data.push(doc)
        }
        let totalCountData = []
        const totalCountCursor = await coll.aggregate(totalCountPipeLine);
        for await (let count of totalCountCursor) {
            totalCountData.push(count)
        }
        let result = {
            data: data,
            totalCount : totalCountData[0]
        }
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllState = async (req, res) => {
    try {
        const coll = zipdao.collection('ZipAggregates');
        let stateArr = [];
        const dataaa = await coll.find({},{ projection: {State : 1} }).toArray(function(err, result) {
            if (err) throw err;
            result.map((item) => {
                if(!stateArr.includes(item.State))
                    stateArr.push(item.State);
            })                               
            res.json(stateArr);
          });
    } catch (error) {
        res.json({ message: error.message });
    }
}
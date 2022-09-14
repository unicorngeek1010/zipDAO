import React, { useEffect, useState } from 'react';
import { Collapse, Button } from 'antd';
import { Checkbox } from 'antd';
import axios from 'axios';
import { Table } from 'antd';
import qs from 'qs';
const { Panel } = Collapse;

const columns = [
    {
        title: 'State',
        dataIndex: 'State',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Gross Income',
        dataIndex: 'Gross Income',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Returns',
        dataIndex: '# of Returns',
        sorter: true,
        width: '20%',
    },
    {
        title: 'People',
        dataIndex: '# of People',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Elderly',
        dataIndex: '# of Elderly',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Property Owners',
        dataIndex: '# of Property Owners',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Charitable Contributions',
        dataIndex: '# of Charitable Contributions',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Amount of Charitable Contributions',
        dataIndex: 'Amount of Charitable Contributions',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Zip Code',
        dataIndex: 'Zip Code',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Average Income per Person',
        dataIndex: 'Average Income per Person',
        sorter: true,
        width: '20%',
    },
    {
        title: 'People Per Return',
        dataIndex: 'People Per Return',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Elderly Percent',
        dataIndex: 'Elderly Percent',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Charity Amount of Total Gross Percent',
        dataIndex: 'Charity Amount of Total Gross Percent',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Charitable Contributions Percent',
        dataIndex: 'Charitable Contributions Percent',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Property Owners Percent',
        dataIndex: 'Property Owners Percent',
        sorter: true,
        width: '20%',
    },
    {
        title: 'rank',
        dataIndex: 'rank',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Tier',
        dataIndex: 'Tier',
        sorter: true,
        width: '20%',
    },
  ];

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });


export default function Explore() {
    const [stateList, setStateList] = useState([]);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
        current: 1,
        pageSize: 10,
        },
        state : [],
        grossIncome : {
            min: 0,
            max: 0
        },
        returns : {
            min: 0,
            max: 0
        },
        people : {
            min:0,
            max:0
        },
        elderly: {
            min:0,
            max:0
        },
        owners: {
            min:0,
            max:0
        },
        contributions: {
            min:0,
            max:0
        },
        amountContributions: {
            min: 0,
            max: 0
        },
        zipCode: "",
        averageIncome: {
            min:0,
            max:0
        },
        perReturn: {
            min: 0,
            max: 0
        },
        elderlyPercentage: {
            min:0,
            max:0
        },
        grossPercentage: {
            min:0,
            max:0
        },
        contirubtionsPercentage: {
            min:0,
            max:0
        },
        ownersPercentage: {
            min:0,
            max:0
        },
        rank: {
            min:0,
            max:0
        },
        Tier: "",
    });

    const fetchData = async() => {
        console.log(tableParams,"111111111111")
        setLoading(true);
        axios.post('http://192.168.111.192:5000/products', qs.stringify(getRandomuserParams(tableParams))).then((res) => {
            setData(res.data.data);
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination,
                total: res.data.totalCount.totalCount, // 200 is mock data, you should read it from server
                // total: data.totalCount,
              },
            });
        setLoading(false);

            console.log(res.data,"ddddd")
        })
      
      };

    useEffect(() => {
        fetchData();
        axios.get(`http://192.168.111.192:5000/products/getAllState`).then((res) => setStateList(res.data))

      }, [JSON.stringify(tableParams)]);

    // useEffect(async() => {
    //     // fetch(`http://192.168.111.192:5000/products/getAllState`).then((res) => console.log(res.json())).then(({results}) => console.log(results,"RRRRR"))
        
    // })

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            ...tableParams,
            pagination,
            filters,
            ...sorter,
        });
      };

    const onCheckState = (e, list) => {
        console.log(tableParams,"Ccccc");
        if(e.target.checked == true) {
            tableParams.state.push(list)
            setTableParams(tableParams)
        } else {
            let index = tableParams.state.indexOf(list)
            if( index !=-1) {
                tableParams.state.splice(index,1);
                setTableParams(tableParams);
            }
        }
    }
    return(
        <div class="appContainer">
            <div style={{disply:'flex', flexDirection:'column', gap:'10px'}}>
                <Collapse expandIconPosition='end'>
                    <Panel header="State List" key="1">
                        <div style={{display: 'flex', flexDirection: 'column', gap:'5px'}}>
                            {stateList?.map((list, index) => {
                                return(
                                    <Checkbox onChange={(e) => onCheckState(e, list)}><span>{list}</span></Checkbox>
                                )
                            })}
                        </div>
                        
                    </Panel>
                    <Panel header="Gross Income" key="2">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.grossIncome.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) =>{ 
                                    tableParams.grossIncome.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    
                    </Panel>
                    <Panel header="Returns" key="3">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.returns.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.returns.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="People" key="4">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.people.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.people.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Elderly" key="5">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.elderly.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.elderly.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Property Owners" key="6">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.owners.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.owners.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Charitable Contributions" key="7">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.contributions.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.contributions.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Amount of Charitable Contribution" key="8">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.amountContributions.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.amountContributions.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Zip Code" key="9">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Code Number"
                                type="string"
                                onChange={(e) => {
                                    tableParams.zipCode = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Average Income per Person" key="10">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.averageIncome.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.averageIncome.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="People Per Return" key="11">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.perReturn.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.perReturn.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Elderly Percent" key="12">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.elderlyPercentage.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.elderlyPercentage.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Charity Amount of Total Gross Percentage" key="13">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.grossPercentage.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.grossPercentage.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Charitable Contributions Percentage" key="14">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.contirubtionsPercentage.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.contirubtionsPercentage.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Property Owners Percentage" key="15">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.ownersPercentage.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.ownersPercentage.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                    <Panel header="Rank" key="16">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Min"
                                type="number"
                                onChange={(e) => {
                                    tableParams.rank.min = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                            <input
                                class="numberRange"
                                placeholder="Max"
                                type="number"
                                onChange={(e) => {
                                    tableParams.rank.max = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>

                    <Panel header="Tier" key="17">
                        <div style={{display:'flex', gap: '5px', marginTop:'10px'}}>
                            <input
                                class="numberRange"
                                placeholder="Code Number"
                                type="string"
                                onChange={(e) => {
                                    tableParams.Tier = e.target.value;
                                    setTableParams(tableParams);
                                }}
                            />
                        </div>
                    </Panel>
                </Collapse>
                <Button style={{width: "300px"}} onClick={fetchData}>
                    Apply
                </Button>
            </div>
           
            <div class="content">
                <div style={{fontSize: '28px' , textAlign:'center'}}>Zip Dao Search</div> 
                <Table
                    columns={columns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
            
        </div>
    )
}
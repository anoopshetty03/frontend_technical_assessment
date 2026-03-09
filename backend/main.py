from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str = "smoothstep"

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # Create adjacency list and indegree map
    adj_list = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    # Build the graph
    for edge in edges:
        if edge.source in adj_list and edge.target in adj_list:
            adj_list[edge.source].append(edge.target)
            indegree[edge.target] += 1

    # Kahn's algorithm - topological sort
    from collections import deque
    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in adj_list[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited all nodes, it's a DAG
    return visited_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse',response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineData):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing pipeline: {str(e)}")

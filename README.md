# Frontend Technical Assessment - Visual Pipeline Builder

A React-based node-and-edge visual pipeline builder with a Python/FastAPI backend. This project demonstrates modern frontend architecture patterns, component abstraction, and full-stack integration.

## Table of Contents

- [Quick Start](#quick-start)
- [Node Abstraction](#node-abstraction)
- [Text Node Logic](#text-node-logic)
- [Backend Integration](#backend-integration)

---

## Quick Start

### Prerequisites
- Node.js (v14+)
- Python 3.8+
- npm or yarn

### Setup and Run

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will be available at `http://localhost:3000`

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`

### API Documentation
Once the backend is running, visit: `http://localhost:8000/docs` for interactive API documentation.


## Node Abstraction

**Location:** `frontend/src/nodes/BaseNode.js`

```javascript
import { createNode } from './BaseNode';

// Define node configuration
const textConfig = {
  title: 'Text',
  width: 200,
  height: 80,
  fields: [
    {
      key: 'text',
      label: 'Text Input',
      type: 'textarea',
      default: 'Hello, World!'
    }
  ],
  handles: [
    { id: 'output', type: 'source', position: Position.Right },
  ],
  color: '#e3f2fd',
};

// Create component with a single line
export const TextNode = createNode(textConfig);
```

### Node Configuration Structure

```javascript
{
  // Display
  title: string,                    // Node title
  width?: number,                   // Custom width (default: 200)
  height?: number,                  // Custom height (default: 80)
  color?: string,                   // Background color
  description?: string,             // Optional tooltip text

  // Input Fields
  fields: Array<{
    key: string,                    // State key
    label: string,                  // Display label
    type: 'text' | 'select' | 'textarea',
    default: any,                   // Initial value
    options?: Array<{label, value}> // For select fields
  }>,

  // Data Connections
  handles: Array<{
    id: string,                     // Handle identifier
    type: 'source' | 'target',      // Connection direction
    position: Position enum,        // Top, Bottom, Left, Right
    label?: string,                 // Optional label
    top?: number                    // Position offset
  }>
}
```

### Existing Nodes (Using BaseNode)

The following nodes are already implemented using the BaseNode abstraction:

1. **Filter Node** - Data filtering operations
2. **Database Node** - Database query execution
3. **APICall Node** - Make API requests
4. **File Reader Node** - File input handling
5. **JSON Parser Node** - JSON parsing and transformation

### Creating New Nodes

To create a new node, follow this pattern:

```javascript
// File: frontend/src/nodes/newNodeType.js
import { createNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
  title: 'New Node Type',
  width: 220,
  height: 100,
  color: '#f3e5f5',
  fields: [
    {
      key: 'param1',
      label: 'Parameter 1',
      type: 'text',
      default: 'default value'
    }
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ]
};

export const NewNodeType = createNode(config);
```


## Text Node Logic

### Challenge

The Text Node needed two enhancements:

1. **Dynamic Sizing** - Width and height should adjust as user types
2. **Variable Extraction** - Extract `{{ variableName }}` syntax and create input handles

### Implementation Details

**Location:** `frontend/src/nodes/textNode.js`

#### 1. Dynamic Sizing

**Height Adjustment:**
```javascript
useEffect(() => {
  const ta = textareaRef.current;
  if (ta) {
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }
}, [currText]);
```

The textarea's height is set to auto first, then to its scroll height. This creates a "grow as you type" effect.

**Width Adjustment:**
```javascript
const maxLineWidth = Math.max(
  ...currText.split('\n').map((line) => {
    ruler.textContent = line || ' ';
    return ruler.offsetWidth;
  })
);
setNodeWidth(Math.min(Math.max(220, maxLineWidth + 40), 500));
```

A hidden "ruler" div measures each line's width. The node width is constrained between 220px and 500px.

#### 2. Variable Extraction

**Regex Pattern:**
```javascript
/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
```

This regex matches:
- `{{` - Opening brackets
- `\s*` - Optional whitespace
- `[a-zA-Z_$][a-zA-Z0-9_$]*` - Valid JavaScript variable name
- `\s*` - Optional whitespace
- `}}` - Closing brackets

**Variable Extraction Function:**
```javascript
const extractVariables = (text) => {
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();
  let match;
  while ((match = variableRegex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  return [...variables];
};
```

**Creating Handles from Variables:**

For each extracted variable, a target handle is dynamically created on the left side of the node. This allows data to flow from upstream nodes into the text template.

**Example:**

Input text: `"Hello {{firstName}}, your age is {{age}}"`
Generated handles:
- `firstName` (target, left side)
- `age` (target, left side)



##  Backend Integration

### Goal

Validate that submitted pipelines:
1. Form a valid directed acyclic graph (DAG)
2. Report the number of nodes and edges
3. Provide user-friendly feedback

### Frontend Implementation

**Location:** `frontend/src/submit.js`

```javascript
const handleSubmit = async () => {
  const response = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });

  const data = await response.json();
  
  // Display results to user
  alert(`
    Nodes: ${data.num_nodes}
    Edges: ${data.num_edges}
    Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗ (Contains cycles)'}
  `);
};
```

### Backend Implementation

**Location:** `backend/main.py`

#### Data Models

```python
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
```

#### DAG Detection - Kahn's Algorithm

The backend uses **Kahn's topological sorting algorithm** to detect cycles:

```python
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm for topological sorting.
    
    Time Complexity: O(V + E)
    Space Complexity: O(V + E)
    """
    # Build adjacency list
    adj_list = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}
    
    for edge in edges:
        if edge.source in adj_list and edge.target in adj_list:
            adj_list[edge.source].append(edge.target)
            indegree[edge.target] += 1
    
    # Queue nodes with indegree 0
    queue = deque([node_id for node_id, deg in indegree.items() if deg == 0])
    processed = 0
    
    # Process nodes
    while queue:
        node_id = queue.popleft()
        processed += 1
        
        for neighbor in adj_list[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed == len(nodes)
```

#### Endpoint Response

**Response Format (Status 200):**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

**Backend Implementation:**
```python
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineData):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges)
    }
```

### Example Scenarios

#### ✅ Valid DAG
```
Nodes: 5
Edges: 4
Is DAG: Yes ✓

Pipeline structure:
  Input → LLM → Text → Output
           ↓
         Filter → Output
```

#### ❌ Contains Cycle
```
Nodes: 3
Edges: 3
Is DAG: No ✗ (Contains cycles)

Pipeline structure:
  A → B → C
  ↑       ↓
  └─────← (cycle detected!)
```

### Testing the Backend

Use the interactive API documentation at: `http://localhost:8000/docs`

Or test with curl:
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
      {"id": "2", "type": "output", "position": {"x": 200, "y": 0}, "data": {}}
    ],
    "edges": [
      {"id": "e1-2", "source": "1", "target": "2", "type": "smoothstep"}
    ]
  }'
```

**Version**: 1.0.0

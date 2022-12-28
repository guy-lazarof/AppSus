const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from './note.service.js';
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Component } from './base-component';
import { autobind } from '../decorators/autobind';

// Project Item
export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
    private project: Project;

    get persons() {
        return this.project.people === 1
            ? '1 person'
            : this.project.people + ' persons';
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStart(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEnd(event: DragEvent) {
        event.preventDefault();
        console.log(event);
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStart);
        this.element.addEventListener('dragend', this.dragEnd);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent =
            this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
